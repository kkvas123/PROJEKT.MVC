const path = require("path");

const rootDir = require("../utils/path");

const fs = require("fs");

const homeworksPath = path .join(rootDir, "data", "homeworks.json" );

const getHomeworksFromFile = (callback) => {
    fs.readFile(homeworksPath, (err,data) => {
        if (err){
            return callback([]);
        }
        callback(JSON.parse(data))
    });
};

let homeworks = [];
let nextId = 1;

class Homework {
    constructor(description, deadline, status) {
        this.description = description;
        this.deadline = deadline;
        this.status = status;
        this.id = nextId++;
    }

    

save() {
    getHomeworksFromFile((homeworks) => {
        const index = homeworks.findIndex(homework => homework.id === this.id);
        if (index !== -1) {
            homeworks[index] = this;
        } 
        else {   
            homeworks.push(this);
        }

        fs.writeFile(homeworksPath, JSON.stringify(homeworks), (err) => {
            console.log(err);
        });
    });
}

    static fetchAll(callback) {
        getHomeworksFromFile(callback);
    }

    static findById(id, callback) {
        getHomeworksFromFile((homeworks) => {
            const homework = homeworks.find(homework => homework.id === id);
            callback(homework);
        });
    }

}

module.exports = Homework;
