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
  userDto: UserDto
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
  name:        string;
  image:        string;
  description: string;
  listSubtopicsDto: SubtopicDto[];
}

export interface SubtopicDto {
  id:          string;
  name:        string;
  image:        string;
  description: string;
}

export interface UserDto {
  firstName:  string;
  lastName:   string;
}