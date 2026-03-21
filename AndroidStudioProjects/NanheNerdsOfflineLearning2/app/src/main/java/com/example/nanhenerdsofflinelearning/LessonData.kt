package com.example.nanhenerdsofflinelearning

data class LessonData(
    val id: Int,
    val title: String,
    val subject: String,
    val content: String
)

data class QuizQuestionData(
    val id: Int,
    val lessonId: Int,
    val question: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanation: String = ""
)
