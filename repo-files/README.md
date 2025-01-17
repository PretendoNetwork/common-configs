# Repository File Templates

This directory contains templates for repository files that should be included in all repositories.

## The files

- `.editorconfig`: [EditorConfig](https://editorconfig.org/) configuration file.
  - This file ensures editors use consistent settings for indentation and line endings
  - Editors usually require a plugin to use this file
- `.gitattributes`: [Git Attributes](https://git-scm.com/docs/gitattributes) configuration file.
  - Ensures line endings committed to the repository are consistent between OSs (Windows and Unix)
  - This is usually not required, but some git setups try to commit CR/LF line endings on Windows
