def normalize_bool(value):
    if isinstance(value, bool):
        return int(value)
    if str(value).lower() in ["true", "1"]:
        return 1
    if str(value).lower() in ["false", "0"]:
        return 0
    raise ValueError("Invalid boolean value")




def validate_fields(fields):

    if not isinstance(fields, list) or len(fields) == 0:
        raise ValueError("fields must be a non-empty list")

    required_keys = {"name", "type", "required", "locked"}

    for field in fields:
        if not required_keys.issubset(field.keys()):
            raise ValueError(f"Invalid field structure: {field}")
