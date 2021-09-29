#include <QtSql>
#include <gtest/gtest.h>
#include <iostream>

#ifndef MYSQL_USER
#define MYSQL_USER ""
#endif
#ifndef MYSQL_PASSWORD
#define MYSQL_PASSWORD ""
#endif
#ifndef MYSQL_HOST
#define MYSQL_HOST ""
#endif
#ifndef MYSQL_PORT
#define MYSQL_PORT -1
#endif

#ifndef POSTGRESQL_USER
#define POSTGRESQL_USER ""
#endif
#ifndef POSTGRESQL_PASSWORD
#define POSTGRESQL_PASSWORD ""
#endif
#ifndef POSTGRESQL_HOST
#define POSTGRESQL_HOST ""
#endif
#ifndef POSTGRESQL_PORT
#define POSTGRESQL_PORT -1
#endif

void testCanOpen(QString const& driver, QString const& username, QString const& password, int const& port = -1, QString const& host = "") {
    QSqlDatabase db = QSqlDatabase::addDatabase(driver);
    if(port != -1) {
        db.setPort(port);
    }
    if(!host.isEmpty()) {
        db.setHostName(host);
    }

    db.setUserName(username);
    db.setPassword(password);

    auto code = db.open();
    if(!code) {
        auto drivers = QSqlDatabase::drivers();
        std::cerr << "avail driver: ";
        for(auto driver: drivers) {
            std::cerr << driver.toStdString() << " ";
        }
        qDebug() << db.lastError().text();
        std::cerr << db.lastError().text().toStdString() << std::endl;
    }
    EXPECT_TRUE(code);
    EXPECT_TRUE(db.isOpen());
}

TEST(SqlDriver, MySQL){
    testCanOpen("QMYSQL", MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_HOST);
}

TEST(SqlDriver, PostgreSQL){
    testCanOpen("QPSQL", POSTGRESQL_USER, POSTGRESQL_PASSWORD, POSTGRESQL_PORT, POSTGRESQL_HOST);

}
