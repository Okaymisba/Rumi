package example.com

import java.io.File

fun countLinesInProject(directory: File): Pair<Int, Map<String, Int>> {
    var totalLines = 0
    val extensionLineCounts = mutableMapOf<String, Int>()

    fun countLinesInFile(file: File): Int = file.useLines { it.count() }

    fun traverseAndCountLines(dir: File) {
        dir.walk().forEach {
            if (it.isFile) {
                val ext = it.extension
                if (ext in listOf("html", "htm", "css", "js", "ts", "php", "aspx", "cshtml", "jsp", "vue", "jsx", "tsx",
                        "java", "kt", "kts", "cs", "py", "rb", "go", "rs", "scala", "pl", "pm", "ex", "exs",
                        "erl", "hrl", "lua", "swift", "m", "mm", "R", "r", "jl", "sh", "bat", "ps1", "c", "h",
                        "cpp", "hpp", "cc", "cxx", "hh", "hxx", "f", "for", "f90", "f95", "pas", "pp", "adb",
                        "ads", "xml", "yaml", "yml", "json", "md", "tex", "sql", "pls", "plsql", "mk", "hs",
                        "lisp", "lsp", "cl", "el", "scm", "ss", "cbl", "cob", "asm", "s", "v", "vh", "vhd", "vhdl")) {
                    val lines = countLinesInFile(it)
                    totalLines += lines
                    extensionLineCounts[ext] = extensionLineCounts.getOrDefault(ext, 0) + lines
                }
            }
        }
    }

    if (directory.exists() && directory.isDirectory) {
        traverseAndCountLines(directory)
    } else {
        println("Directory does not exist or is not a directory")
    }

    return Pair(totalLines, extensionLineCounts)
}