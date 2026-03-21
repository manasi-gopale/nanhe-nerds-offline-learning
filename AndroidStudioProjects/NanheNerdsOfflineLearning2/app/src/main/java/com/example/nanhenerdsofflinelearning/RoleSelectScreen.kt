package com.example.nanhenerdsofflinelearning

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun RoleSelectScreen(
    onStudentClick: () -> Unit,
    onTeacherClick: () -> Unit
) {
    Scaffold { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(24.dp),
            verticalArrangement = Arrangement.SpaceEvenly,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "NANHE NERDS",
                    style = MaterialTheme.typography.headlineLarge
                )
                Spacer(Modifier.height(8.dp))
                Text(
                    text = "Offline Learning for Every Child",
                    style = MaterialTheme.typography.bodyMedium
                )
            }

            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Button(
                    onClick = onStudentClick,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp)
                ) {
                    Text("I AM A STUDENT")
                }
                OutlinedButton(
                    onClick = onTeacherClick,
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp)
                ) {
                    Text("I AM A TEACHER")
                }
                Spacer(Modifier.height(8.dp))
                Text(
                    text = "All content works offline • No internet required",
                    style = MaterialTheme.typography.bodySmall
                )
            }
        }
    }
}

@Composable
fun StudentHomeScreen(
    onBrowseLessons: (String) -> Unit,
    onViewProgress: (String) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }
    var selectedLanguage by remember { mutableStateOf("English") }
    val languages = listOf("English", "Hindi")

    Scaffold { innerPadding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(24.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text("STUDENT HOME", style = MaterialTheme.typography.headlineSmall)
            Spacer(Modifier.height(24.dp))

            Box {
                OutlinedButton(onClick = { expanded = true }) {
                    Text("Language: $selectedLanguage")
                }
                DropdownMenu(
                    expanded = expanded,
                    onDismissRequest = { expanded = false }
                ) {
                    languages.forEach { lang ->
                        DropdownMenuItem(
                            text = { Text(lang) },
                            onClick = {
                                selectedLanguage = lang
                                expanded = false
                            }
                        )
                    }
                }
            }

            Spacer(Modifier.height(32.dp))

            Button(
                onClick = { onBrowseLessons(selectedLanguage) },
                modifier = Modifier.fillMaxWidth().height(52.dp)
            ) {
                Text("BROWSE LESSONS")
            }

            Spacer(Modifier.height(16.dp))

            Button(
                onClick = { onViewProgress(selectedLanguage) },
                modifier = Modifier.fillMaxWidth().height(52.dp)
            ) {
                Text("MY PROGRESS")
            }
        }
    }
}

@Composable
fun TeacherHomeScreen() {
    Box(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text("Teacher Dashboard (coming soon)")
    }
}
