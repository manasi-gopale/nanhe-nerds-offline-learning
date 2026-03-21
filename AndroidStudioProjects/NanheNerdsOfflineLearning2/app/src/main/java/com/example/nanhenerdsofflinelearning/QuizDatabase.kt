package com.example.nanhenerdsofflinelearning.com.example.nanhenerdsofflinelearning
import androidx.room.*
import kotlinx.coroutines.flow.Flow

// Entity: stores each quiz attempt
@Entity(tableName = "users")
data class UserEntity(
    @PrimaryKey val id: Int = 1,
    val name: String,
    val role: String, // "student" or "teacher"
    val languagePreference: String,
    val createdAt: Long = System.currentTimeMillis()
)

@Dao
interface UserDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun saveUser(user: UserEntity)

    @Query("SELECT * FROM users WHERE id = 1")
    fun getUser(): Flow<UserEntity?>
}
@Entity(tableName = "quiz_results")
data class QuizResultEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val lessonId: Int,
    val lessonTitle: String,
    val subject: String,
    val score: Int,
    val total: Int,
    val percentage: Int,
    val timestamp: Long = System.currentTimeMillis()
)

// DAO: database access object
@Dao
interface QuizResultDao {
    @Insert
    suspend fun insertResult(result: QuizResultEntity)

    @Query("SELECT * FROM quiz_results ORDER BY timestamp DESC")
    fun getAllResults(): Flow<List<QuizResultEntity>>

    @Query("SELECT * FROM quiz_results WHERE subject = :subject")
    fun getResultsBySubject(subject: String): Flow<List<QuizResultEntity>>

    @Query("DELETE FROM quiz_results")
    suspend fun clearAllResults()
}

// Database
@Database(entities = [QuizResultEntity::class], version = 1)
abstract class NanheNerdsDatabase : RoomDatabase() {
    abstract fun quizResultDao(): QuizResultDao

    companion object {
        @Volatile
        private var INSTANCE: NanheNerdsDatabase? = null

        fun getDatabase(context: android.content.Context): NanheNerdsDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    NanheNerdsDatabase::class.java,
                    "nanhe_nerds_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
