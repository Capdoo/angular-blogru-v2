export interface PostDto {
  id:              string;
  title:           string;
  summary:         string;
  topicId:         string;
  subtopicId:      string;
  topicDto:       TopicDto;
  subtopicDto:    SubtopicDto;
  userId:          string;
  register_date:   string;
  listSectionsDto: SectionDto[];
}

export interface SectionDto {
  id:                string;
  title:             string;
  target:            string;
  headerDto:         HeaderDto;
  listParagraphsDto: ParagraphDto[];
}

export interface HeaderDto {
  id:    string;
  title: string;
}

export interface ParagraphDto {
  id:          string;
  title:       string;
  description: string;
  content:     string;
}

export interface TopicDto {
  id:          string;
  description: string;
}

export interface SubtopicDto {
  id:          string;
  description: string;
}