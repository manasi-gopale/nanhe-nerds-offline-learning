package com.example.nanhenerdsofflinelearning

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel

@Composable
fun ProgressScreen(
    language: String,
    onBack: () -> Unit
) {
    val context = LocalContext.current
    val db = NanheNerdsDatabase.getDatabase(context)
    val repository = remember { QuizRepository(db.quizResultDao()) }
    val factory = remember { QuizViewModelFactory(repository) }
    val quizViewModel: QuizViewModel = viewModel(factory = factory)

    val results = quizViewModel.quizResults.collectAsState(initial = emptyList()).value

    val subjectAverages = results
        .groupBy { it.subject }
        .mapValues { (_, list) -> list.map { it.percentage }.average() }
    val weakArea = subjectAverages.minByOrNull { it.value }

    Scaffold { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text("MY PROGRESS", style = MaterialTheme.typography.headlineMedium)
                Text(
                    "← BACK",
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.clickable { onBack() }
                )
            }

            if (results.isEmpty()) {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "No quiz results yet.\nStart taking quizzes!",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
                return@Scaffold
            }

            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = 16.dp)
            ) {
                Column(Modifier.padding(16.dp)) {
                    Text(
                        text = "Overall: ${results.map { it.percentage }.average().toInt()}%",
                        style = MaterialTheme.typography.titleMedium
                    )
                    if (weakArea != null) {
                        Text(
                            text = "Weak Area: ${weakArea.key} (${weakArea.value.toInt()}%)",
                            style = MaterialTheme.typography.bodySmall
                        )
                    }
                    Text(
                        text = "Quizzes Done: ${results.size}",
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }

            Text(
                "QUIZ HISTORY",
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(bottom = 12.dp)
            )

            LazyColumn(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                items(results) { result ->
                    Card(modifier = Modifier.fillMaxWidth()) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Column {
                                Text(result.lessonTitle, style = MaterialTheme.typography.titleSmall)
                                Text(result.subject, style = MaterialTheme.typography.bodySmall)
                            }
                            Text(
                                "${result.score}/${result.total} (${result.percentage}%)",
                                style = MaterialTheme.typography.titleSmall
                            )
                        }
                    }
                }
            }

            Spacer(Modifier.height(16.dp))
            Button(
                onClick = onBack,
                modifier = Modifier.fillMaxWidth().height(52.dp)
            ) {
                Text("BACK TO HOME")
            }
        }
    }
}
