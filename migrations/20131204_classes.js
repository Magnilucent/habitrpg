/**
 * Probably the biggest migration of all! This adds the following features:
 *  - Customization Redo: https://trello.com/c/YKXmHNjY/306-customization-redo
 *  - Armory: https://trello.com/c/83M5RqQB/299-armory
 *  - Classes
 */

db.users.find().forEach(function(user){

  user.stats.class = 'warrior';

  // set default stats (inc mp?)
  user.stats.points = user.stats.lvl;

  // grant backer/contrib gear, 300, rather than using js logic

  // customizations redo: https://trello.com/c/YKXmHNjY/306-customization-redo

  // migrate current owned items

  // gender => size
  user.preferences.size = (user.preferences.gender == 'f') ? 'slim' : 'broad';
  delete user.preferences.gender;

  // Delete armorSet
  delete user.preferences.armorSet;

  user.preferences.sleep = user.flags.rest;
  delete user.flags.rest;

  _.each(user.tasks, function(task){

    // migrate task.priority from !, !!, !!! => 1, 1.5, 2
    var p = task.priority;
    task.priority = p == '!!!' ? 2 : p == '!!' ? 1.5 : 1;

    // Add task attributes
    task.attribute = 'str';

  })

  db.users.update({_id:user._id}, user);
});