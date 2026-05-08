import json
import os
import time
from dotenv import load_dotenv
import redis
from pymongo import MongoClient
from bson import ObjectId
from processor import process

load_dotenv()

QUEUE_NAME = "task_queue"

r = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    password=os.getenv("REDIS_PASSWORD", None),
    decode_responses=True,
    ssl=True,
    ssl_cert_reqs=None,
    socket_connect_timeout=10,
    socket_timeout=10
)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["aitasksDB"]
tasks = db["tasks"]

def handle_job(task_id):
    task = tasks.find_one({"_id": ObjectId(task_id)})
    if not task:
        print(f"Task {task_id} not found")
        return

    # status: running
    tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"status": "running"}, "$push": {"logs": "Job started, processing..."}}
    )
    print(f"Task {task_id} status: running")

    time.sleep(2)  # so frontend can show 'running' state

    try:
        result = process(task["operation"], task["inputText"])

        tasks.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {"status": "success", "result": result},
                "$push": {"logs": f"Operation completed. Result: {result}"}
            }
        )
        print(f"Task {task_id} status: success | result: {result}")

    except Exception as e:
        tasks.update_one(
            {"_id": ObjectId(task_id)},
            {
                "$set": {"status": "failed"},
                "$push": {"logs": f"Error: {str(e)}"}
            }
        )
        print(f"Task {task_id} status: failed | error: {e}")


def main():
    print("Worker started, waiting for jobs...")
    while True:
        try:
            job = r.blpop(QUEUE_NAME, timeout=5)
            if job:
                _, payload = job
                data = json.loads(payload)
                print(f"Picked up from Redis queue: {data['taskId']}")
                handle_job(data["taskId"])
        except Exception as e:
            print(f"Worker error: {e}")
            time.sleep(2)


if __name__ == "__main__":
    main()