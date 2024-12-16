const launches=new Map();

const launch={
  flightNumber:100,
  launchDate: new Date('December 27,2030'),
  mission:'Kepler Exploration X',
  rocket:'Explorer IS1',
  destination:'Kepler-442 b',
  customers:['ISRO','NASA'],
  upcoming:true,
  success:true,
}

launches.set(launch.flightNumber,launch);

module.exports={
  launches,
}