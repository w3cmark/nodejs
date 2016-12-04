# copyright

## mongodb

+ 配置config文件

```
##数据库目录
dbpath=C:\M_DB

##日志输出文件
logpath=C:\M_LOG\mongodb.log
```

+ 安装MongoDB服务

```
mongod --config "C:\Program Files\MongoDB 2.6 Standard\bin\mongo.config" --install
```

+ 启动服务

```
net start mongodb
```

## 数据库操作

+ 新建数据库

第一步：use 新建数据库名；

第二步：进行此库相关的操作；如果不进行第二步，该数据库不会被创建

进入mongodb命令操作：mongo

+ 查看数据库

```
show dbs;
```

+ 新建表

```
db.createCollection('要新建的表名');
```

+ 查看当前数据库下表

```
show collections;
```

+ 删除当前数据库指定表

```
db.表名.drop();
```

+ 删除当前数据库

```
db.dropDatabase();
```

+ 导出数据库

```
没有制定数据库时，备份所有数据
mongodump -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -o 保存文件夹
没有密码的本地mongo
mongodump -d 数据库 -o 保存文件夹
```

+ 导入数据库

```
文件前边有--drop时候表示先删除原来同名的数据库
mongorestore -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 --drop 文件夹路径 
```

+ 备份表

导出

```
mongoexport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 -f 字段 -q 条件导出 --csv -o 文件名  
-f 指定导出字段，以字号分割，-f name,email,age导出name,email,age这三个字段
-q 可以根查询条件导出，-q '{ "uid" : "100" }' 导出uid为100的数据
--csv 表示导出的文件格式为csv的，这个比较有用，因为大部分的关系型数据库都是支持csv，在这里有共同点
```

导入

```
mongoimport -h IP --port 端口 -u 用户名 -p 密码 -d 数据库 -c 表名 [--upsert|--drop] 文件名  
--upsert （默认）插入备份文件中的数据（不会删除原来的数据）
```

## 应用部署