package com.yazanalmatar.projectframe.services;

import com.yazanalmatar.projectframe.domain.Backlog;
import com.yazanalmatar.projectframe.domain.Project;
import com.yazanalmatar.projectframe.exceptions.ProjectIdException;
import com.yazanalmatar.projectframe.repositories.BacklogRepository;
import com.yazanalmatar.projectframe.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier());
            }
            if (project.getId() != null) {
                project.setBacklog(backlogRepository
                        .findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID " + project.getProjectIdentifier().toLowerCase() + " already exists");
        }
        //TODO determine whether the user is the owner if the project or no


    }

    public Project findProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID " + projectId + " does not exist");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId) {
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if (project == null) {
            throw new ProjectIdException("Cannot Delete Project with ID " + projectId + ". This project does not exist");
        }
        projectRepository.delete(project);
    }

    public Project updateProjectByIdentifier(Project project, String projectId) {
        Project project1 = projectRepository.findByProjectIdentifier(projectId);
        if (project1 == null) {
            throw new ProjectIdException("Project ID " + projectId + " does not exist");
        }
        projectRepository.save(project);
        return project;
    }

}
