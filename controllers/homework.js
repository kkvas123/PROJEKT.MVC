const { request, response } = require("express");
const Homework = require("../models/homework");


const renderListPage = (request, response) => {
    Homework.fetchAll((homeworks) => {
        response.render("homeworkList", {
            pageTitle: "Homework list",
            homeworks
        });
    })
};


const renderAddPage = (request, response) => {
    response.render("addHomework", {
        pageTitle: "Add new homework"
    });
};


const addNewHomework = (request, response) => {
    const { description, deadline } = request.body;
    const homework = new Homework(description, deadline, "To Do");
    homework.save();
    response.redirect("/");
};

const renderEditPage = (request, response) => {
    const id = parseInt(request.params.id);
    Homework.findById(id, (homeworkToEdit) => {
        response.render("editHomework", {
            pageTitle: "Edit homework",
            homework: homeworkToEdit
        });
    });
};



const editHomework = (request, response) =>{
    const { description, deadline, status} = request.body;
    const id = parseInt(request.params.id);

    const homeworkToEdit = new Homework(description, deadline, status);
    homeworkToEdit.id = id;
    homeworkToEdit.save();

    response.redirect("/");
};

module.exports = {renderListPage, renderAddPage, addNewHomework, renderEditPage, editHomework };


