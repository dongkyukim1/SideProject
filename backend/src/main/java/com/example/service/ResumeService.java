package com.example.service;

import com.example.dto.ResumeDto;
import com.example.entity.Resume;
import com.example.entity.User;
import com.example.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResumeService {
    
    private final ResumeRepository resumeRepository;
    private final OpenAIService openAIService;
    
    @Transactional
    public ResumeDto.Response createResume(User user, ResumeDto.CreateRequest request) {
        Resume resume = new Resume();
        resume.setUser(user);
        resume.setContent(request.getContent());
        
        // OpenAI API를 통한 피드백 생성
        String feedback = openAIService.generateFeedback(request.getContent());
        resume.setFeedback(feedback);
        
        Resume savedResume = resumeRepository.save(resume);
        return convertToDto(savedResume);
    }
    
    @Transactional(readOnly = true)
    public List<ResumeDto.Response> getUserResumes(User user) {
        return resumeRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public ResumeDto.Response getResume(Long id) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이력서를 찾을 수 없습니다."));
        return convertToDto(resume);
    }
    
    @Transactional
    public ResumeDto.Response updateResume(Long id, ResumeDto.UpdateRequest request) {
        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("이력서를 찾을 수 없습니다."));
        
        resume.setContent(request.getContent());
        // 내용이 수정되었으므로 새로운 피드백 생성
        String feedback = openAIService.generateFeedback(request.getContent());
        resume.setFeedback(feedback);
        
        return convertToDto(resume);
    }
    
    private ResumeDto.Response convertToDto(Resume resume) {
        ResumeDto.Response response = new ResumeDto.Response();
        response.setId(resume.getId());
        response.setContent(resume.getContent());
        response.setFeedback(resume.getFeedback());
        response.setCreatedAt(resume.getCreatedAt());
        response.setUpdatedAt(resume.getUpdatedAt());
        return response;
    }
} 