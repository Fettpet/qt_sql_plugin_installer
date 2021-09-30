# Supported

At the moment only ubuntu-latest and windows-latest are tested. Mac is currently not supported

|           | MySQL 8.0          | PostgreSQL 13      |   |   |
|-----------|--------------------|--------------------|---|---|
| Qt 5.10.0 | :x:                | :x:                |   |   |
| QT 5.15.2 | :heavy_check_mark: | :heavy_check_mark: |   |   |
| QT 6.0.0  | :x:                | :x:                |   |   |
| QT 6.1.3  | :heavy_check_mark: | :heavy_check_mark: |   |   |
| QT 6.2.0  | :heavy_check_mark: | :heavy_check_mark: |   |   |

# Usage

## Prerequirements

There are some requirements to use this action. 

1. A compiler must be installed. The action is tested with msvc on windows and clang on linux.
2. The database must be installed
3. A matching version of Qt must be installed


## Parameter

  * **mysql-install**: Boolean; set to true to install the mysql plugin 
  * **mysql-path**: Path to the MySql installation. The directory must be contain lib and include directory. Only relevant for windows
  * **postgresql-install**:
    description: Boolean; set to true to install the postgresql plugin
  * **postgresql-path**: Path to the postgresql installation. Must be contain lib and include directory. only relevant for windows
  * **qt-version**: Installed Qt version. The Plugins are installed for these qt version.

