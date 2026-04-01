import csv
from collections import Counter
import requests

HOST = "http://jcssdev.pythonanywhere.com/"

def get_data(resource):
    url = HOST + resource
    rows = []

    # Keep going until there are no more pages
    while url:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        rows.extend(data["results"])
        url = data["next"]

    return rows


def get_bug_id(bug_url):
    return bug_url.rstrip("/").split("/")[-1]


def main():
    # Get all bugs and comments from the API
    bugs = get_data("bugs")
    comments = get_data("comments")

    # Count bugs for each package
    bugs_per_package = Counter(bug["package"] for bug in bugs)
    # Count comments for each bug id
    comments_per_bug = Counter(get_bug_id(comment["bug"]) for comment in comments)

    # Write total bugs per package
    with open("total_bugs_per_package.csv", "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["package", "total"])
        writer.writerows(bugs_per_package.items())

    # Write total comments per bug id
    with open("total_comments_per_bug.csv", "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["bug_id", "total"])
        writer.writerows(comments_per_bug.items())


if __name__ == "__main__":
    main()
