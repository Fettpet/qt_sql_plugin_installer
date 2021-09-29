#include <QtSql>
#include <gtest/gtest.h>
#include <iostream>

#ifndef MYSQL_USER
#define MYSQL_USER ""
#endif
#ifndef MYSQL_PASSWORD
#define MYSQL_PASSWORD ""
#endif

TEST(SqlDriver, MySQL){
    QSqlDatabase db = QSqlDatabase::addDatabase("QMYSQL");
    auto code = db.open(MYSQL_USER, MYSQL_PASSWORD);
    if(!code) {
        qDebug() << db.lastError().text();
        std::cerr << db.lastError().text().toStdString();
        qDebug() << "User " << MYSQL_USER << " PAssword " << MYSQL_PASSWORD;
    }
    EXPECT_TRUE(db.isOpen());
}
