package example.com.plugins

import example.com.parseGitLogOutput
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.io.File
import kotlinx.serialization.Serializable
import java.io.BufferedReader
import java.io.InputStreamReader

@Serializable
data class RepoRequest(val repoUrl: String)

@Serializable
data class CommitData(
    val labels: List<String>,
    val values: List<Int>
)


fun Application.configureRouting() {
    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.respondText(text = "500: $cause" , status = HttpStatusCode.InternalServerError)
        }
    }
    routing {
         staticFiles("/", File("files"))
        post("/api/process") {
            val request = call.receive<RepoRequest>()
            val repoUrl = request.repoUrl
            val cloneDir = File("Git/Cloned Dir").apply { mkdir() }

            // For Cloning
            val cloneCommand = listOf("git", "clone" , repoUrl , cloneDir.absolutePath)

            val cloneProcessBuilder = ProcessBuilder(cloneCommand)

            cloneProcessBuilder.directory(cloneDir)

            cloneProcessBuilder.redirectErrorStream(true)

            cloneProcessBuilder.start().waitFor()

            // For Counting
            val counterForGraphCommand = listOf("sh" , "-c" , "git log --pretty=format:'%H %cd' --date=short --numstat | awk '/^([a-f0-9]{40})/ { commit = $1; date = $2; next } NF == 3 { added += $1; removed += $2 } /^$/ { print commit, date, \"Added lines:\", added, \"Removed lines:\", removed; added = 0; removed = 0; }'")

            val counterForGraphProcessBuilder = ProcessBuilder(counterForGraphCommand)

            counterForGraphProcessBuilder.directory(cloneDir)

            counterForGraphProcessBuilder.redirectErrorStream(true)

                val counterProcess = counterForGraphProcessBuilder.start()

                val inputStream = counterProcess.inputStream
                val output = BufferedReader(InputStreamReader(inputStream)).use { it.readText() }

                counterProcess.waitFor()

                val parsedData = parseGitLogOutput(output)

            cloneDir.deleteRecursively()

                val dates = parsedData.first
                val linesAdded = parsedData.second

                println(dates)
                println(linesAdded)

                val responseData = CommitData(
                    labels = dates ,
                    values = linesAdded
                )

                call.respond(responseData)


        }
    }

    }


