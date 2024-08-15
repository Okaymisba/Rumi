package example.com

fun parseGitLogOutput(output: String): Triple<List<String>, List<Int>, List<Int>> {
    val dates = mutableListOf<String>()
    val linesAdded = mutableListOf<Int>()
    val linesRemoved = mutableListOf<Int>()

    val lines = output.lines()
    for (line in lines) {
        val parts = line.split(" ")
        if (parts.size >= 8) { // Ensure that there are enough parts in the line
            val date = parts[1]
            val addedLines = parts[4].toIntOrNull() ?: 0
            val removedLines = parts[7].toIntOrNull() ?: 0

            dates.add(date)
            linesAdded.add(addedLines)
            linesRemoved.add(removedLines)
        }
    }

    return Triple(dates, linesAdded, linesRemoved)
}
