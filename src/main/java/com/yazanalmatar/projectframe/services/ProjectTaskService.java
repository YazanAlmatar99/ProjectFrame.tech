package com.yazanalmatar.projectframe.services;

import com.yazanalmatar.projectframe.domain.Backlog;
import com.yazanalmatar.projectframe.domain.Project;
import com.yazanalmatar.projectframe.domain.ProjectTask;
import com.yazanalmatar.projectframe.exceptions.ProjectNotFoundException;
import com.yazanalmatar.projectframe.repositories.BacklogRepository;
import com.yazanalmatar.projectframe.repositories.ProjectRepository;
import com.yazanalmatar.projectframe.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username) {
        //TODO - Exceptions: Project not found

        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();// backlogRepository.findByProjectIdentifier(projectIdentifier);
        projectTask.setBacklog(backlog);
        Integer BacklogSequence = backlog.getPTSequence();
        BacklogSequence++;
        backlog.setPTSequence(BacklogSequence);
        projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0 || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }
        if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
            projectTask.setStatus("TO_DO");
        }


        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogById(String id, String username) {
        Project project = projectService.findProjectByIdentifier(id, username);
        if (project == null) {
            throw new ProjectNotFoundException("Project with ID: " + id + " does not exist.");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findProjectTaskByProjectSequence(String backlog_id, String sequence, String username) {
        Project project = projectService.findProjectByIdentifier(backlog_id, username);

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task with ID: " + sequence + " is not found.");
        }

        if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
            throw new ProjectNotFoundException("Project Task with ID: " + sequence + " does not exist in project: " + backlog_id);
        }
        return projectTask;

    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedProjectTask, String backlog_id, String sequence, String username) {

        ProjectTask projectTask = findProjectTaskByProjectSequence(backlog_id, sequence, username);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task with ID: " + sequence + " does not exist in project: " + backlog_id);
        }
        projectTask = updatedProjectTask;

        return projectTaskRepository.save(projectTask);

    }

    public void deleteProjectTaskByProjectSequence(String backlog_id, String sequence, String username) {
        ProjectTask projectTask = findProjectTaskByProjectSequence(backlog_id, sequence, username);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project Task with ID: " + sequence + " does not exist in project: " + backlog_id);
        }

        projectTaskRepository.delete(projectTask);
    }
}
