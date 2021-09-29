cmake_minimum_required(VERSION 3.21 FATAL_ERROR)
project (Tests LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(MYSQL_USER "" CACHE STRING "MYSQL user name to access database")
set(MYSQL_PASSWORD "" CACHE STRING "MYSQL password to access database")


find_package(Qt5 REQUIRED COMPONENTS Core Sql)
add_subdirectory(third_party)

enable_testing()

message(WARNING "MYSQL ${MYSQL_USER}  ${MYSQL_PASSWORD}" )

add_executable(SQLTest main.cpp)
target_compile_definitions(SQLTest PUBLIC -DMYSQL_USER="${MYSQL_USER}" -DMYSQL_PASSWORD="${MYSQL_PASSWORD}")
target_link_libraries(SQLTest Qt5::Core Qt5::Sql gtest_main)
add_test(SQLTest SQLTest)
