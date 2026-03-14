class CluedoTracker {
  // 1. Properties
  propertyName: string;
  anotherProperty: number;

  // 2. Constructor
  constructor(name: string, value: number) {
    this.propertyName = name;
    this.anotherProperty = value;
  }

  // 3. Methods
  methodName(): void {
    console.log(`The value of propertyName is: ${this.propertyName}`);
  }
}

// 4. Instantiation
const instanceName = new CluedoTracker("Example Name", 100);
instanceName.methodName();

// I'll use context to maintain the data across these different routes