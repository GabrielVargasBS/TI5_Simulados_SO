import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-process-scheduling',
  templateUrl: './process-scheduling.component.html',
  styleUrls: ['./process-scheduling.component.scss']
})
export class ProcessSchedulingComponent {
  selectedPolicy: string = '';

  readyJobs: Job[];
  waitingJobs: Job[];
  finishedJobs: Job[];
  listAllJobs: Job[];

  constructor(private ngZone: NgZone) {
    this.readyJobs = Job.generateJobs(5);
    this.waitingJobs = [];
    this.finishedJobs = [];
    this.listAllJobs = this.readyJobs;
  }

  simulate() {
    let schedulingPolicy = this.selectedPolicy;
    let processScheduling = new ProcessScheduling(3, 0, schedulingPolicy, 0, this.readyJobs, this.waitingJobs, this.finishedJobs, 1, 2, 3);
    
    processScheduling.start((job) => {
      this.ngZone.run(() => {
        // Marca o job como finalizado
        job.status = 'Finalizado';
  
        // Remove o job de readyJobs
        let index = this.readyJobs.indexOf(job);
        if (index > -1) {
          this.readyJobs.splice(index, 1);
          this.readyJobs = [...this.readyJobs];
        }
        
        // Adiciona o job a finishedJobs
        this.finishedJobs.push(job);
        this.finishedJobs = [...this.finishedJobs];
      });
    });
  }

  getPercentage(job: Job) {
    return (job.currentInstruction / job.length) * 100;
  }
}

enum ComparisonCriteria {
    ARRIVAL_TIME = 'ARRIVAL_TIME',
    PRIORITY = 'PRIORITY',
    DURATION = 'DURATION'
}

class Job {
    id: number;
    priority: number;
    arrivalTime: Date;
    executionTime: number;
    instructionsStr: string[];
    length: number;
    duration: number;
    instructions: number[];
    status: string;
    currentInstruction: number;
    comparisonCriteria?: ComparisonCriteria;

    constructor(id: number, priority: number, arrivalTime: Date, instructionsStr: string[], ioTime: number, memoryAccessTime: number, ulaTime: number) {
        this.id = id;
        this.priority = priority;
        this.arrivalTime = arrivalTime;
        this.executionTime = 0;
        this.instructionsStr = instructionsStr;
        this.length = instructionsStr.length;
        this.duration = 0;
        this.instructions = new Array(instructionsStr.length);
        this.status = 'Pronto';
        this.currentInstruction = 0;
    }

    static setComparisonCriteria(jobs: Job[], newCriteria: ComparisonCriteria) {
        for (let job of jobs) {
            job.comparisonCriteria = newCriteria;
        }
    }

    static generateInstructions(): string[] {
      let instructions = new Array(5);
      let instructionOptions = ["ADD", "SUB", "MULT", "DIV", "LW", "SW", "READ", "WRITE"];
  
      for (let i = 0; i < instructions.length; i++) {
          let randomIndex = Math.floor(Math.random() * instructionOptions.length);
          instructions[i] = instructionOptions[randomIndex];
      }
      return instructions;
    }

    toString(): string {
        return `Job { id=${this.id}, priority=${this.priority}, arrivalTime=${this.arrivalTime}, instructionsStr=${this.instructionsStr} }\n`;
    }
    
    compareTo(other: Job): number {
        switch (this.comparisonCriteria) {
            case ComparisonCriteria.ARRIVAL_TIME:
                return this.compareByArrivalTime(other);
            case ComparisonCriteria.PRIORITY:
                return this.compareByPriority(other);
            case ComparisonCriteria.DURATION:
                return this.compareByDuration(other);
            default:
                throw new Error("Unknown comparison criteria: " + this.comparisonCriteria);
        }
    }

    compareByArrivalTime(other: Job): number {
        let result = this.arrivalTime.getTime() - other.arrivalTime.getTime();
        if (result == 0) result = this.priority - other.priority;
        return result;
    }

    compareByPriority(other: Job): number {
        let result = this.priority - other.priority;
        if (result == 0) result = this.arrivalTime.getTime() - other.arrivalTime.getTime();
        return result;
    }

    compareByDuration(other: Job): number {
        let result = this.duration - other.duration;
        if (result == 0) result = this.priority - other.priority;
        return result;
    }

    static generateJobs(numJobs: number): Job[] {
      let jobs = [];
      for (let i = 1; i <= numJobs; i++) {
        let instructions = Job.generateInstructions();
        let priority = Math.floor(Math.random() * 3) + 1;
        let job = new Job(i, priority, new Date(Date.now() + (10000 * i)), instructions, 1, 2, 3);
        jobs.push(job);
        console.log(job.toString());
      }
      return jobs;
    }
}

class ProcessScheduling {
  quantum: number;
  overheadTime: number;
  schedulingPolicy: string;
  instructionsPerSecond: number;
  readyJobs: Job[];
  waitingJobs: Job[];
  finishedJobs: Job[];
  ulaWaitTime: number;
  memoryAccessWaitTime: number;
  ioWaitTime: number;

  constructor(quantum: number, overheadTime: number, schedulingPolicy: string, instructionsPerSecond: number, readyJobs: Job[], waitingJobs: Job[], finishedJobs: Job[], ulaWaitTime: number, memoryAccessWaitTime: number, ioWaitTime: number) {
    this.quantum = quantum;
    this.overheadTime = overheadTime;
    this.schedulingPolicy = schedulingPolicy;
    this.instructionsPerSecond = instructionsPerSecond;
    this.readyJobs = readyJobs;
    this.waitingJobs = waitingJobs;
    this.finishedJobs = finishedJobs;
    this.ulaWaitTime = ulaWaitTime;
    this.memoryAccessWaitTime = memoryAccessWaitTime;
    this.ioWaitTime = ioWaitTime;
  }

  assignInstructionValues() {
    for (let job of this.readyJobs) {
      for (let i = 0; i < job.instructionsStr.length; i++) {
        let instruction = job.instructionsStr[i];
        switch (instruction) {
          case "ADD": 
          case "SUB": 
          case "MULT": 
          case "DIV": 
            job.instructions[i] = this.ulaWaitTime;
            job.duration += this.ulaWaitTime;
            break;
          case "LW": 
          case "SW":                            
            job.instructions[i] = this.memoryAccessWaitTime;
            job.duration += this.memoryAccessWaitTime;
            break;
          case "READ": 
          case "WRITE":           
            job.instructions[i] = this.ioWaitTime; 
            job.duration += this.ioWaitTime;
            break;
          default:                                         
            job.instructions[i] = 0; 
            break;
        }
      }
    }
  }

  start(onJobFinished: (job: Job) => void) {
    this.assignInstructionValues()
  
    switch (this.schedulingPolicy) {
      case "FIFO":       this.startFIFO(onJobFinished);       break;
      case "SJF":        this.startSJF(onJobFinished);        break;
      case "RoundRobin": this.startRoundRobin(onJobFinished); break;
      case "Priority":   this.startPriority(onJobFinished);   break;
      default: console.log("Invalid scheduling policy: " + this.schedulingPolicy);
    }
  }

  async startFIFO(onJobFinished: (job: Job) => void) {
    Job.setComparisonCriteria(this.readyJobs, ComparisonCriteria.ARRIVAL_TIME);
    this.readyJobs.sort((a, b) => a.compareTo(b));

    for (let job of this.readyJobs) {
      while(job.currentInstruction != job.instructions.length) {
        let pos = job.currentInstruction;
        await this.waitSeconds(job.instructions[pos]);
        job.executionTime += job.instructions[pos];
        job.currentInstruction++;
      }

      onJobFinished(job);

      // Print
      console.log(`\nJob ID: ${job.id}, Execution time: ${job.executionTime} seconds`);
    }
  }

  async startSJF(onJobFinished: (job: Job) => void) {
    Job.setComparisonCriteria(this.readyJobs, ComparisonCriteria.DURATION);
    this.readyJobs.sort((a, b) => a.compareTo(b));

    for (let job of this.readyJobs) {
      while(job.currentInstruction != job.instructions.length) {
        let pos = job.currentInstruction;
        await this.waitSeconds(job.instructions[pos]);
        job.executionTime += job.instructions[pos];
        job.currentInstruction++;
      }

      onJobFinished(job);

      // Print
      console.log(`\nJob ID: ${job.id}, Execution time: ${job.executionTime} seconds`);
    }
  }

  async startRoundRobin(onJobFinished: (job: Job) => void) {
    Job.setComparisonCriteria(this.readyJobs, ComparisonCriteria.ARRIVAL_TIME);
    this.readyJobs.sort((a, b) => a.compareTo(b));
    
    while(this.readyJobs.length > 0) {
      for (let job of this.readyJobs) {
        let shouldBreak = false;
        
        while (job.currentInstruction != job.instructions.length) {
          let pos = job.currentInstruction;
          await this.waitSeconds(job.instructions[pos]);
          job.executionTime += job.instructions[pos];
          job.currentInstruction++;
  
          if(job.duration == job.executionTime) break;
  
          if(job.executionTime >= this.quantum) {
            shouldBreak = true;
            break;
          }
        }
        if (!shouldBreak) {
          job.status = 'Finalizado';
          onJobFinished(job);
          console.log(`\nJob ID: ${job.id}, Execution time: ${job.executionTime} seconds`);
        }
      }
    }
  }

  async startPriority(onJobFinished: (job: Job) => void) {
    Job.setComparisonCriteria(this.readyJobs, ComparisonCriteria.PRIORITY);
    this.readyJobs.sort((a, b) => a.compareTo(b));

    for (let job of this.readyJobs) {
      while(job.currentInstruction != job.instructions.length) {
        let pos = job.currentInstruction;
        await this.waitSeconds(job.instructions[pos]);
        job.executionTime += job.instructions[pos];
        job.currentInstruction++;
      }

      onJobFinished(job);

      // Print
      console.log(`\nJob ID: ${job.id}, Execution time: ${job.executionTime} seconds`);
    }
  }

  async waitSeconds(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  }
}