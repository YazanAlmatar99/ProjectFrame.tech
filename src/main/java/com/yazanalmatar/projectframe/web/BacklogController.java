package com.yazanalmatar.projectframe.web;

import com.yazanalmatar.projectframe.domain.ProjectTask;
import com.yazanalmatar.projectframe.services.MapValidationErrorService;
import com.yazanalmatar.projectframe.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result, @PathVariable String backlog_id) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id, projectTask);

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }


    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id) {

        return projectTaskService.findBacklogById(backlog_id);
    }

    @GetMapping("/{backlog_id}/{project_task_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable String backlog_id, @PathVariable String project_task_id) {
        ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlog_id, project_task_id);

        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{project_task_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result, @PathVariable String backlog_id, @PathVariable String project_task_id) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask updatedProjectTask = projectTaskService.updateByProjectSequence(projectTask, backlog_id, project_task_id);

        return new ResponseEntity<ProjectTask>(updatedProjectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{project_task_id}")
    public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String project_task_id) {
        projectTaskService.deleteProjectTaskByProjectSequence(backlog_id, project_task_id);
        return new ResponseEntity<String>("Project Task " + project_task_id + " was successfully deleted", HttpStatus.OK);
    }
}