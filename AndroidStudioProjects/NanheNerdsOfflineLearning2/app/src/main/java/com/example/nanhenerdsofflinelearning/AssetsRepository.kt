package com.example.nanhenerdsofflinelearning

import android.content.Context
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

data class QuestionData(
    val id: Int = 0,
    val lessonId: Int = 0,
    val question: String = "",
    val options: List<String> = emptyList(),
    val correctIndex: Int = 0,
    val explanation: String = "",
    val subject: String = "",
    val language: String = "English"
)

class AssetsRepository(private val context: Context) {

    private fun readAsset(fileName: String): String? {
        return try {
            context.assets.open(fileName).bufferedReader().use { it.readText() }
        } catch (e: Exception) {
            null
        }
    }

    fun getLessons(language: String): List<LessonData> {
        val fileName = if (language == "Hindi") "lessons_hi.json" else "lessons_en.json"
        val json = readAsset(fileName) ?: return getDummyLessons()
        return try {
            val type = object : TypeToken<List<LessonData>>() {}.type
            Gson().fromJson(json, type) ?: getDummyLessons()
        } catch (e: Exception) {
            getDummyLessons()
        }
    }

    fun getLessonQuestions(standard: Int, lessonId: Int, language: String): List<QuestionData> {
        val fileName = if (language == "Hindi") "quiz_hi.json" else "quiz_en.json"
        val json = readAsset(fileName) ?: return getDummyQuestions(lessonId)
        return try {
            val type = object : TypeToken<List<QuestionData>>() {}.type
            val all: List<QuestionData> = Gson().fromJson(json, type) ?: emptyList()
            val filtered = all.filter { it.lessonId == lessonId && it.language == language }
            if (filtered.isEmpty()) getDummyQuestions(lessonId) else filtered
        } catch (e: Exception) {
            getDummyQuestions(lessonId)
        }
    }

    private fun getDummyLessons(): List<LessonData> = listOf(
        LessonData(1, "Our Environment", "EVS", "Everything around us forms our environment."),
        LessonData(2, "Living and Non-Living Things", "EVS", "Living things move, eat and grow. Non-living things do not."),
        LessonData(3, "So Many Kinds of Animals", "EVS", "Animals live in air, water and on land."),
        LessonData(4, "Animal Shelters", "EVS", "Animals need shelters to stay safe."),
        LessonData(5, "Directions and Maps", "EVS", "The sun rises in the East and sets in the West.")
    )

    private fun getDummyQuestions(lessonId: Int): List<QuestionData> = listOf(
        QuestionData(
            id = 1,
            lessonId = lessonId,
            question = "What do we call everything around us?",
            options = listOf("Environment", "Weather", "Society", "Universe"),
            correctIndex = 0,
            explanation = "Everything around us — air, water, soil, animals and plants — forms our environment.",
            subject = "EVS",
            language = "English"
        ),
        QuestionData(
            id = 2,
            lessonId = lessonId,
            question = "Which of these is a living thing?",
            options = listOf("Stone", "Sparrow", "River", "Road"),
            correctIndex = 1,
            explanation = "A sparrow eats, grows, moves and lays eggs — so it is a living thing.",
            subject = "EVS",
            language = "English"
        ),
        QuestionData(
            id = 3,
            lessonId = lessonId,
            question = "In which direction does the sun rise?",
            options = listOf("West", "North", "East", "South"),
            correctIndex = 2,
            explanation = "The sun always rises in the East.",
            subject = "EVS",
            language = "English"
        )
    )
}

fun getLessons(language: String): List<LessonData> {
    return listOf(
        LessonData(1, "Our Environment", "EVS", "Everything around us forms our environment."),
        LessonData(2, "Living and Non-Living Things", "EVS", "Living things move, eat and grow."),
        LessonData(3, "So Many Kinds of Animals", "EVS", "Animals live in air, water and on land."),
        LessonData(4, "Animal Shelters", "EVS", "Animals need shelters to stay safe."),
        LessonData(5, "Directions and Maps", "EVS", "The sun rises in the East and sets in the West.")
    )
}
