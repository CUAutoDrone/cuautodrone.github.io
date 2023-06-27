import os
import json

REPLACEMENTS = [
    ("_", " "),
    ("(star)", "*"),
    ("(slash)", "/"),
    ("(colon)", ":"),
    ("(question)", "?"),
]


def clean_name(name):
    name = name[name.find("~") + 1 :]
    for args in REPLACEMENTS:
        name = name.replace(*args)
    return name[:-3] if name.endswith(".md") else name


def generate_json(folder_path):
    json_data = []
    for item in sorted(os.listdir(folder_path)):
        item_path = os.path.join(folder_path, item)
        if os.path.isdir(item_path):
            json_data.append(generate_category_json(item, item_path))
        else:
            raise Exception(f"Extraneous files in category directory {item}")
    return json_data


def generate_category_json(category_name, category_path):
    return {
        "type": "category",
        "name": clean_name(category_name),
        "children": generate_section_json(category_path),
    }


def generate_section_json(category_path):
    json_data = []
    for item in sorted(os.listdir(category_path)):
        item_path = os.path.join(category_path, item)
        if os.path.isdir(item_path):
            potential_srcs = list(
                filter(
                    lambda file: clean_name(file) == clean_name(item),
                    os.listdir(item_path),
                )
            )
            if len(potential_srcs) != 1:
                raise Exception(
                    f"Incorrect number of .md files for section {item}, {len(potential_srcs)} candidates, must be 1"
                )
            path = f"{os.path.join(item_path, potential_srcs[0])}"
            json_data.append(
                {
                    "type": "section",
                    "name": clean_name(item),
                    "path": path,
                    "children": generate_subsection_json(item, item_path),
                }
            )
        elif item.endswith(".md"):
            json_data.append(
                {
                    "type": "section",
                    "name": clean_name(item),
                    "path": item_path,
                    "children": [],
                }
            )
    return json_data


def generate_subsection_json(section, subsection_path):
    json_data = []
    for item in sorted(os.listdir(subsection_path)):
        if clean_name(item) == clean_name(section):
            continue
        if item.endswith(".md"):
            json_data.append(
                {
                    "type": "subsection",
                    "name": clean_name(os.path.basename(item)),
                    "path": os.path.join(subsection_path, item),
                }
            )
        else:
            raise Exception(
                f"Extraneous non .md files in subsection directory {subsection_path}"
            )
    return json_data


root_folder = "src"
json_data = generate_json(root_folder)

json_file_path = "navbar.json"
with open(json_file_path, "w") as json_file:
    json.dump(json_data, json_file, indent=4)
print("JSON Completed")
