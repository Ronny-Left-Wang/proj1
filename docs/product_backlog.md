# User Epic
| Epic |
| ---- |
| As a user, I want to create and manage posts |
| As a user, I want to comment on posts |
| As a unregistered user, I want to create and manage an account |
| As an admin, I want to manage users and posts |

# User Stories
#### As a user, I want to create and manage posts
| Est. | Prio. | Story |
| ---- | ----- | ----- |
| 2    | 8     | As a visitor, I want to find and view posts |
| 5    | 8     | As a user, I want to create posts |
| 5    | 3     | As a user, I want to manage posts |

#### As a user, I want to comment on posts
| Est. | Prio. | Story |
| ---- | ----- | ----- |
| 5    | 2     | As a user, I want to comment on posts |
| 2    | 1     | As a user, I want to delete my comments |

#### As a unregistered user, I want to create and manage an account
| Est. | Prio. | Story |
| ---- | ----- | ----- |
| 8    | 5     | As an unregistered user, I want to create an account |
| 5    | 3     | As a user, I want to manage my account |
| 5    | 3     | As a user, I want to stay securely logged in |

#### As an admin, I want to manage users and posts 
| Est. | Prio. | Story |
| ---- | ----- | ----- |
| 3    | 1     | As an admin, I want to manage users |
| 3    | 2     | As an admin, I want to manage posts |
| 3    | 1     | As an admin, I want to manage comments |


# Tasks
#### As a visitor, I want to find and view posts
| Est. Time | Task |
| --------- | ---- |
| 3h        | Posts model in backend & db |
| 3h        | View displaying all posts (shortened) |
| 1h        | View displaying a single post with details |

#### As a user, I want to create posts
| Est. Time | Task |
| --------- | ---- |
| 3h        | Post creation in backend & db |
| 3h        | Post creation view, only accessible by admin |

#### As a user, I want to manage posts
| Est. Time | Task |
| --------- | ---- |
| 3h        | Make a page for editing and deleting post |
| 1h         | Backend for editing posts |
| 1h         | Backend for deleting posts |

#### As an unregistered user, I want to create an account
| Est. Time | Task |
| --------- | ---- |
| 3h        | User model in backend & db |
| 2h        | Display user profile listing their comments on posts |
| 2h        | Registration view |
| 1h        | Login view |
| 2h        | Display log in/out message |
| 2h        | Backend for creating an account |

#### As a user, I want to manage my account
| Est. Time | Task |
| --------- | ---- |
| 3h        | Create a view for user preferences |
| 1h         | Backend for editing account |
| 1h         | Backend for deleting account |

#### As a user, I want to stay securely logged in
| Est. Time | Task |
| --------- | ---- |
| 2h        | For every view, check if user is logged in |
| 4h         | Backend for authorization token |

#### As an admin, I want to manage users
| Est. Time | Task |
| --------- | ---- |
| 1h        | For the user editing views, give access if user of type admin is logged in |
| 2h        | Create a view only accessible by admins to create a user without any verification |

#### As an admin, I want to manage posts
| Est. Time | Task |
| --------- | ---- |
| 1h         | For the post editing views, give access if user of type admin is logged in |

#### As an admin, I want to delete comments
| Est. Time | Task |
| --------- | ---- |
| 3h        | In the post view, give the user the option to delete comments, only if admin |

#### As a user, I want to comment on posts
| Est. Time | Task |
| --------- | ---- |
| 3h        | Comment model in backend & db |
| 2h        | Make a comment section at bottom of Post view |

