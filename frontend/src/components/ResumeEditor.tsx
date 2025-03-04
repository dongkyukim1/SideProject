import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  useToast,
  Text
} from '@chakra-ui/react';
import { resumeApi } from '@/services/api';
import { Resume } from '@/types';

interface ResumeEditorProps {
  initialContent?: string;
  resumeId?: number;
  onSave?: (resume: Resume) => void;
}

export default function ResumeEditor({ initialContent = '', resumeId, onSave }: ResumeEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      let response;
      
      if (resumeId) {
        response = await resumeApi.update(resumeId, { content });
      } else {
        response = await resumeApi.create({ content });
      }

      toast({
        title: '저장되었습니다.',
        description: 'AI가 피드백을 생성하고 있습니다.',
        status: 'success',
      });

      if (onSave) {
        onSave(response.data);
      }
    } catch (error) {
      toast({
        title: '오류가 발생했습니다.',
        description: '잠시 후 다시 시도해주세요.',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>이력서 내용</FormLabel>
        <Textarea
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="이력서 내용을 입력하세요..."
          minH="300px"
          resize="vertical"
        />
      </FormControl>

      <Button
        colorScheme="blue"
        isLoading={isLoading}
        onClick={handleSubmit}
        disabled={!content.trim()}
      >
        {resumeId ? '수정하기' : '피드백 받기'}
      </Button>
    </VStack>
  );
} 