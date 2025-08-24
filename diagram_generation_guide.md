# Diagram Generation Guide

This guide explains how to generate a PNG diagram from a PlantUML file using a standalone JAR file. This method does not require Xcode and is suitable for macOS users.

## Prerequisites

- **Java**: Ensure that Java is installed on your system. You can verify this by running `java -version` in your terminal.
- **PlantUML JAR**: Download the PlantUML JAR file from the [PlantUML website](http://plantuml.com/download).

## Steps to Generate PNG

1. **Download PlantUML JAR**:

   - Use the following command to download the PlantUML JAR file:
     ```bash
     curl -L -o plantuml.jar https://sourceforge.net/projects/plantuml/files/plantuml.jar/download
     ```

2. **Generate PNG**:

   - Run the following command to generate a PNG from your PlantUML file:
     ```bash
     java -jar plantuml.jar -tpng /path/to/your/diagram.puml
     ```
   - Replace `/path/to/your/diagram.puml` with the actual path to your PlantUML file.

3. **Locate the Output**:
   - The generated PNG file will be saved in the same directory as your PlantUML file with the same name but with a `.png` extension.

## Example

To generate a PNG from a file named `ai_project_assistant_sequence.puml` located in the current directory, use:

```bash
java -jar plantuml.jar -tpng ai_project_assistant_sequence.puml
```

The output will be `ai_project_assistant_sequence.png` in the same directory.

## Notes

- Ensure that the PlantUML file is free of syntax errors before running the command.
- This method is platform-independent and can be used on any system with Java installed.
