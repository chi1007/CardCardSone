import os 
password = os.getenv('mysql_pwd')
class Config(object):
    pass


class ProdConfig(Config):
    DEBUG = False
    TESTING = False

    MYSQL_HOST = 'mysql'
    MYSQL_USER = 'hccu'
    MYSQL_PASSWORD = 'hccu'
    MYSQL_DB = 'hccu'
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@{}/{}'.format(
    #     MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB)
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@{}/{}'.format(
        MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB)
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = 'dkeos;eokfeeiddaj;sief'



class DevelopmentConfig(Config): # 本機測試用的
    DEBUG = True
    TESTING = False

    MYSQL_HOST = '127.0.0.1'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = password
    MYSQL_DB = 'test1'
    # SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@{}/{}'.format(
    #     MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB)
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{}:{}@{}/{}'.format(
        MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_DB)
    SQLALCHEMY_TRACK_MODIFICATIONS = True

    # print('SQLALCHEMY_DATABASE_URI ＝ ', SQLALCHEMY_DATABASE_URI)

    SECRET_KEY = 'dkeos;eokfeeiddaj;sief'

    
class TestConfig(DevelopmentConfig):
    DEBUG = True
    TESTING = True
    SERVER_NAME = 'localhost'
