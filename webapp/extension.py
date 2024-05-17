from flask_debugtoolbar import DebugToolbarExtension
from flask_sqlalchemy import SQLAlchemy

debug_toolbar = DebugToolbarExtension()
db = SQLAlchemy() #物件化的資料庫