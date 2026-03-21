package com.example.nanhenerdsofflinelearning

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.launch

class QuizViewModel(private val repository: QuizRepository) : ViewModel() {

    val quizResults: Flow<List<QuizResult>> = repository.allResults

    fun saveResult(
        lessonId: Int,
        lessonTitle: String,
        subject: String,
        score: Int,
        total: Int,
        language: String
    ) {
        val percentage = if (total > 0) (score * 100) / total else 0
        viewModelScope.launch {
            repository.insertResult(
                QuizResult(
                    lessonId = lessonId,
                    lessonTitle = lessonTitle,
                    subject = subject,
                    score = score,
                    total = total,
                    percentage = percentage,
                    language = language
                )
            )
        }
    }
}

class QuizViewModelFactory(private val repository: QuizRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(QuizViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return QuizViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
