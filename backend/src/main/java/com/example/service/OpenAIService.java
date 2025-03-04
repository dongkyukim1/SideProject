package com.example.service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OpenAIService {

    private final OpenAiService openAiService;
    
    public OpenAIService(@Value("${openai.api.key}") String apiKey) {
        this.openAiService = new OpenAiService(apiKey);
    }
    
    public String generateFeedback(String resumeContent) {
        List<ChatMessage> messages = new ArrayList<>();
        messages.add(new ChatMessage("system", 
            "당신은 전문적인 이력서 리뷰어입니다. 다음 이력서를 분석하고 개선점을 제안해주세요. " +
            "1. 전반적인 인상 2. 강점 3. 개선이 필요한 부분 4. 구체적인 제안사항 순으로 답변해주세요."));
        messages.add(new ChatMessage("user", resumeContent));
        
        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model("gpt-4")
                .messages(messages)
                .maxTokens(1000)
                .temperature(0.7)
                .build();
        
        return openAiService.createChatCompletion(request)
                .getChoices().get(0).getMessage().getContent();
    }
} 