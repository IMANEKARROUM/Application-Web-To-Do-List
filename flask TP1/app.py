from flask import Flask, render_template, request, redirect, url_for
import json, os

app = Flask(__name__)

DATA_FILE = "tasks.json"

# Load tasks
def load_tasks():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

# Save tasks
def save_tasks(tasks):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(tasks, f, indent=4, ensure_ascii=False)

@app.route("/")
def home():
    tasks = load_tasks()
    return render_template("index.html", tasks=tasks)

@app.route("/add", methods=["POST"])
def add():
    title = request.form.get("title")
    priority = request.form.get("priority")

    if not title:
        tasks = load_tasks()
        return render_template("index.html", tasks=tasks, error="Le titre ne peut pas être vide")

    tasks = load_tasks()
    new_id = max([t["id"] for t in tasks], default=0) + 1

    tasks.append({
        "id": new_id,
        "title": title,
        "priority": priority,
        "done": False
    })

    save_tasks(tasks)
    return redirect("/")

@app.route("/done/<int:task_id>")
def done(task_id):
    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = True
            break
    save_tasks(tasks)
    return redirect("/")

@app.route("/delete/<int:task_id>")
def delete(task_id):
    tasks = load_tasks()
    tasks = [t for t in tasks if t["id"] != task_id]
    save_tasks(tasks)
    return redirect("/")

@app.route("/edit/<int:task_id>")
def edit(task_id):
    tasks = load_tasks()
    task = next((t for t in tasks if t["id"] == task_id), None)
    return render_template("index.html", tasks=tasks, task_to_edit=task)


@app.route("/update/<int:task_id>", methods=["POST"])
def update(task_id):
    title = request.form.get("title")
    priority = request.form.get("priority")

    tasks = load_tasks()
    for task in tasks:
        if task["id"] == task_id:
            task["title"] = title
            task["priority"] = priority
            break

    save_tasks(tasks)
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
