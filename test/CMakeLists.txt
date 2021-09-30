cmake_minimum_required(VERSION 3.21 FATAL_ERROR)
project (Tests LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(MYSQL_USER "" CACHE STRING "MySQL user name to access database")
set(MYSQL_PASSWORD "" CACHE STRING "MySQL password to access database")
set(MYSQL_HOST "" CACHE STRING "MySQL IP to Host")
set(MYSQL_PORT "-1" CACHE STRING "MySQL port to Host")


set(POSTGRESQL_USER "" CACHE STRING "PostgreSQL user name to access database")
set(POSTGRESQL_PASSWORD "" CACHE STRING "PostgreSQL password to access database")
set(POSTGRESQL_HOST "" CACHE STRING "PostgreSQL IP to Host")
set(POSTGRESQL_PORT "" CACHE STRING "PostgreSQL port to Host")

set(QT_VERSION "5.0.0" CACHE STRING "Used Qt version")

if(${QT_VERSION} VERSION_GREATER_EQUAL  "5.0.0" AND ${QT_VERSION} VERSION_LESS "6.0.0")
    find_package(Qt5 REQUIRED COMPONENTS Core Sql)
elseif(${QT_VERSION} VERSION_GREATER_EQUAL  "6.0.0")
    find_package(Qt6 REQUIRED COMPONENTS Core Sql)
else()
    message(ERROR "QT version ${QT_VERSION} not valid")
endif()

add_subdirectory(third_party)

enable_testing()


add_executable(SQLTest main.cpp)
target_compile_definitions(SQLTest PUBLIC
    -DMYSQL_USER="${MYSQL_USER}" -DMYSQL_PASSWORD="${MYSQL_PASSWORD}" -DMYSQL_HOST="${MYSQL_HOST}" -DMYSQL_PORT=${MYSQL_PORT}
    -DPOSTGRESQL_USER="${POSTGRESQL_USER}" -DPOSTGRESQL_PASSWORD="${POSTGRESQL_PASSWORD}" -DPOSTGRESQL_HOST="${POSTGRESQL_HOST}" -DPOSTGRESQL_PORT=${POSTGRESQL_PORT}
    )
target_link_libraries(SQLTest Qt5::Core Qt5::Sql gtest_main)
add_test(SQLTest SQLTest)
