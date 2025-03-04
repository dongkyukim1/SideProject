package com.example.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import java.time.LocalDateTime;

public class ResumeDto {
    
    @Data
    @Schema(description = "이력서 생성 요청")
    public static class CreateRequest {
        @Schema(description = "이력서 내용", example = "경력 3년차 백엔드 개발자...")
        private String content;
    }
    
    @Data
    @Schema(description = "이력서 응답")
    public static class Response {
        @Schema(description = "이력서 ID")
        private Long id;
        
        @Schema(description = "이력서 내용")
        private String content;
        
        @Schema(description = "AI 피드백 내용")
        private String feedback;
        
        @Schema(description = "생성 시간")
        private LocalDateTime createdAt;
        
        @Schema(description = "수정 시간")
        private LocalDateTime updatedAt;
    }
    
    @Data
    @Schema(description = "이력서 수정 요청")
    public static class UpdateRequest {
        @Schema(description = "수정된 이력서 내용")
        private String content;
    }
} 