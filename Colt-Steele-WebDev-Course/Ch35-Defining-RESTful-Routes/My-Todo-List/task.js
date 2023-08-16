class Task {
    static lastID = 0;
    
    constructor(name) {
      Task.lastID++;
      this.id = Task.lastID;
      this.name = name;
      this.createdTime = new Date();
      this.completedTime = "";
      this.completed = false;
    }

    incomplete(){
        this.completedTime = "";
    }

    complete(){
        const completeTime = new Date();
        this.completedTime = completeTime;
    }

    formatCreateDate() {
        const year = this.createdTime.getFullYear();
        const month = String(this.createdTime.getMonth() + 1).padStart(2, '0');
        const day = String(this.createdTime.getDate()).padStart(2, '0');
        const hours = String(this.createdTime.getHours()).padStart(2, '0');
        const minutes = String(this.createdTime.getMinutes()).padStart(2, '0');
        const seconds = String(this.createdTime.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    
    formatCompleteDate() {
        const year = this.completedTime.getFullYear();
        const month = String(this.completedTime.getMonth() + 1).padStart(2, '0');
        const day = String(this.completedTime.getDate()).padStart(2, '0');
        const hours = String(this.completedTime.getHours()).padStart(2, '0');
        const minutes = String(this.completedTime.getMinutes()).padStart(2, '0');
        const seconds = String(this.completedTime.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    

  
}
  
module.exports = Task;