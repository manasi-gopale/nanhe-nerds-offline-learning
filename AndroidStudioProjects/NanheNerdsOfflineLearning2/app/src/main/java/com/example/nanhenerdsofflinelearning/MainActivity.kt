package com.example.nanhenerdsofflinelearning
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.nanhenerdsofflinelearning.ui.theme.NanheNerdsOfflineLearningTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            NanheNerdsOfflineLearningTheme {
                nanheNerdsApp()
            }
        }
    }
}

@Composable
fun nanheNerdsApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "splash"
    ) {
        composable("splash") {
            SplashScreen(navController)
        }
        composable("role") {
            RoleSelectScreen(
                onStudentClick = { navController.navigate("studentHome") },
                onTeacherClick = { navController.navigate("teacherLogin") }
            )
        }
        composable("studentHome") {
            StudentHomeScreen(
                onBrowseLessons = { language ->
                    navController.navigate("lessonList/$language")
                },
                onViewProgress = { language ->
                    navController.navigate("progress/$language")
                }
            )
        }
        composable("teacherLogin") {
            TeacherLoginScreen(
                onLoginSuccess = { navController.navigate("teacherDashboard") },
                onBack = { navController.popBackStack() }
            )
        }
        composable("teacherDashboard") {
            TeacherHomeScreen()
        }
        composable("lessonList/{language}") { backStackEntry ->
            val language = backStackEntry.arguments?.getString("language") ?: "English"
            lessonListScreen(
                language = language,
                onBack = { navController.popBackStack() },
                onOpenLesson = { lesson ->
                    navController.navigate("quiz/${lesson.id}/$language")
                }
            )
        }
        composable("progress/{language}") { backStackEntry ->
            val language = backStackEntry.arguments?.getString("language") ?: "English"
            ProgressScreen(
                language = language,
                onBack = { navController.popBackStack() }
            )
        }
        composable("quiz/{lessonId}/{language}") { backStackEntry ->
            val lessonId = backStackEntry.arguments?.getString("lessonId")?.toIntOrNull() ?: 1
            val language = backStackEntry.arguments?.getString("language") ?: "English"
            QuizScreen(
                lessonId = lessonId,
                language = language,
                onBack = { navController.popBackStack() }
            )
        }
    }
}

// -------- Lesson List Screen --------

@Composable
fun lessonListScreen(
    language: String,
    onBack: () -> Unit,
    onOpenLesson: (LessonData) -> Unit
) {
    val lessons: List<LessonData> = getLessons(language)

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
                Text(
                    text = "LESSONS ($language)",
                    style = MaterialTheme.typography.headlineMedium
                )
                Text(
                    text = "← BACK",
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.clickable { onBack() }
                )
            }

            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(lessons) { lesson ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onOpenLesson(lesson) },
                        colors = CardDefaults.cardColors()
                    ) {
                        Column(Modifier.padding(16.dp)) {
                            Text(
                                text = lesson.title.uppercase(),
                                style = MaterialTheme.typography.titleMedium
                            )
                            Text(
                                text = lesson.subject,
                                style = MaterialTheme.typography.bodySmall
                            )
                        }
                    }
                }
            }
        }
    }
}
