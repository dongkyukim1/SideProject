package com.example.controller;

import com.example.dto.ResumeDto;
import com.example.entity.User;
import com.example.service.ResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "이력서", description = "이력서 관리 API")
@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearer-token")
public class ResumeController {

    private final ResumeService resumeService;

    @Operation(summary = "이력서 생성", description = "새로운 이력서를 생성하고 AI 피드백을 받습니다.")
    @PostMapping
    public ResponseEntity<ResumeDto.Response> createResume(
            @Parameter(hidden = true) @AuthenticationPrincipal User user,
            @RequestBody ResumeDto.CreateRequest request) {
        return ResponseEntity.ok(resumeService.createResume(user, request));
    }

    @Operation(summary = "사용자의 이력서 목록 조회", description = "현재 로그인한 사용자의 모든 이력서를 조회합니다.")
    @GetMapping
    public ResponseEntity<List<ResumeDto.Response>> getUserResumes(
            @Parameter(hidden = true) @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(resumeService.getUserResumes(user));
    }

    @Operation(summary = "이력서 상세 조회", description = "특정 이력서의 상세 정보를 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<ResumeDto.Response> getResume(
            @Parameter(description = "이력서 ID") @PathVariable Long id) {
        return ResponseEntity.ok(resumeService.getResume(id));
    }

    @Operation(summary = "이력서 수정", description = "이력서 내용을 수정하고 새로운 AI 피드백을 받습니다.")
    @PutMapping("/{id}")
    public ResponseEntity<ResumeDto.Response> updateResume(
            @Parameter(description = "이력서 ID") @PathVariable Long id,
            @RequestBody ResumeDto.UpdateRequest request) {
        return ResponseEntity.ok(resumeService.updateResume(id, request));
    }
} 