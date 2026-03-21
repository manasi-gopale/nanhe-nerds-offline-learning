package com.example.nanhenerdsofflinelearning
import com.example.nanhenerdsofflinelearning.ui.theme.PixelColors
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.nanhenerdsofflinelearning.ui.theme.PixelColors
import kotlinx.coroutines.delay

@Composable
fun SplashScreen(navController: NavController) {
    LaunchedEffect(Unit) {
        delay(2500)
        navController.navigate("role") {
            popUpTo("splash") { inclusive = true }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(PixelColors.NavyDark),
        contentAlignment = Alignment.Center
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Pixel mascot box
            Box(
                modifier = Modifier
                    .size(80.dp)
                    .background(PixelColors.NavyLight)
                    .border(2.dp, PixelColors.Purple),
                contentAlignment = Alignment.Center
            ) {
                Text("NN", color = PixelColors.Yellow, fontSize = 24.sp)
            }

            Spacer(Modifier.height(8.dp))

            Text(
                text = "NANHE NERDS",
                color = PixelColors.Yellow,
                fontSize = 18.sp,
                letterSpacing = 2.sp
            )

            Text(
                text = "Offline Learning Platform",
                color = PixelColors.TextMuted,
                fontSize = 12.sp
            )

            Spacer(Modifier.height(8.dp))

            // Speech bubble style loading text
            Box(
                modifier = Modifier
                    .background(PixelColors.NavyLight)
                    .border(1.dp, PixelColors.BorderBright)
                    .padding(horizontal = 20.dp, vertical = 10.dp)
            ) {
                Text(
                    text = "Loading your adventure...",
                    color = PixelColors.TextPrimary,
                    fontSize = 11.sp
                )
            }

            Spacer(Modifier.height(8.dp))

            LinearProgressIndicator(
                modifier = Modifier
                    .width(200.dp)
                    .height(4.dp),
                color = PixelColors.Yellow,
                trackColor = PixelColors.BorderDim
            )
        }
    }
}
