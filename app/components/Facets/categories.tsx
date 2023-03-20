import * as React from "react";
const categories = [
    // Add your category IDs and names here
    // I need to find a way to get this from the API
    {id: 2802989, name: "Development"},
    {
        id: 2809279, name: "Development tools",
        children: [
            {id: 3241328, name: "DrupalPod"},
            {id: 3310681, name: "Editors and IDE"},
            {id: 3170898, name: "Git version control"},
        ],
    },
    {id: 2804051, name: "Using composer"},
    {id: 3170898, name: "Git version control",
        children: [
            {id: 3171136, name: "Setting up Git for Drupal"},
            {id: 3171375, name: "Using Git to Contribute to Drupal"},
            {id: 3170912, name: "Git for Drupal project maintainers"},
        ]},
    {id: 3175648, name: "Managing distribution project",
        children: [
            { id: 3175655, name: "Creating a new project" },
            { id: 2819889, name: "Creating a distributions" },
            { id: 2804057, name: "Documenting your project" },
            { id: 3175652, name: "Maintainership" },
        ]},
    {id: 2907842, name: "Security"},
    {id: 3156223, name: "Drupal project issues",
        children: [
            {id: 3156230, name: "Fields and other parts of an issue"},
            {id: 3156256, name: "Issue procedures and etiquette"},
        ]},
    {id: 2804427, name: "Local server setup",
        children: [
            {id: 2809229, name: "Linux development environments"},
            {id: 2809215, name: "Mac development environments"},
            {id: 3196473, name: "Docker development environments",
                children: [
                    {id: 3167421, name: "Docker with Solr Cloud Integration"},
                ]},
        ]},
    {id: 2803901, name: "Usability testing",
        children: [
            {id: 2803903, name: "Drupal usability test results"},
        ]},
    {id: 2802991, name: "Coding standards"},
    {id: 2818707, name: "Profilling Drupal"},
    {id: 2804041, name: "User interface"},
    {id: 2792957, name: "Theming Drupal"},
    {id: 2804139, name: "Creating modules"},
    {id: 2814041, name: "Drupal APIs"},
    {id: 2819027, name: "Automated testing"},
] as Category[];
export default categories;