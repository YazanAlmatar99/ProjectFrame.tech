package com.yazanalmatar.projectframe.services;

import com.yazanalmatar.projectframe.domain.Backlog;
import com.yazanalmatar.projectframe.domain.ProjectTask;
import com.yazanalmatar.projectframe.repositories.BacklogRepository;
import com.yazanalmatar.projectframe.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        //TODO - Exceptions: Project not found

        //TODO - ProjectTasks has to be added to a specific project, project != null => Backlog != null
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        //TODO - Set the Backlog to the ProjectTask
        projectTask.setBacklog(backlog);
        //TODO - Set Project Sequence EX: IDPRO-1, IDPRO-2, etc...
        Integer BacklogSequence = backlog.getPTSequence();
        //TODO- Update the Backlog Sequence and Add it to ProjectTask
        BacklogSequence++;
        projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);
        //TODO - Set Initial Priority when Priority == null
        if (projectTask.getPriority() == 0 || projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        }
        //TODO - Set Initial Status when Status == null
        if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }

        return projectTaskRepository.save(projectTask);
    }
}
