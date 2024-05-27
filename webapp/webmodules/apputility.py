#規劃可以重複使用Variable and Function or class
#定義一組成績資料list物件
scoreList=[100,80,90,40,70,20,100,90,60,10]

#定義函數 產生多筆(list)學生資料(dict)
def studentData():
    #快速建構dict物件
    std1={"id":1,"name":"John","address":"高雄市","phone":"0912345678","country":"Taiwan"}
    std2={"id":2,"name":"Mary","address":"台北市","phone":"0923456789","country":"Taiwan"}
    std3={"id":3,"name":"Tom","address":"台中市","phone":"0934567890","country":"Taiwan"}
    std4={"id":4,"name":"Jerry","address":"台南市","phone":"0945678901","country":"Taiwan"}
    std5={"id":5,"name":"David","address":"桃園市","phone":"0956789012","country":"Taiwan"}
    #收這些dict物件建構一個list物件 進行收集
    stdList=[std1,std2,std3,std4,std5]
    return stdList