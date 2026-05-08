def process(operation, input_text):
    if operation == "uppercase":
        return input_text.upper()
    elif operation == "lowercase":
        return input_text.lower()
    elif operation == "reverse":
        return input_text[::-1]
    elif operation == "wordcount":
        return str(len(input_text.split()))
    else:
        raise ValueError(f"Unknown operation: {operation}")