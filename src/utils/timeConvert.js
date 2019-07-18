export default unixDate => new Date(unixDate).toTimeString().split(':').filter(i => i.length === 2).join(':');
