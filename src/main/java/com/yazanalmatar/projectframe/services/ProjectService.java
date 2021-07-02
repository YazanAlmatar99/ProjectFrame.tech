package com.yazanalmatar.projectframe.services;

import com.yazanalmatar.projectframe.domain.Project;
import com.yazanalmatar.projectframe.exceptions.ProjectIdException;
import com.yazanalmatar.projectframe.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID " + project.getProjectIdentifier().toLowerCase() + " already exists");
        }
        //TODO determine whether the user is the owner if the project or no


    }

}
