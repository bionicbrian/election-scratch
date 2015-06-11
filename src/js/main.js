"use strict";

import React from "react";
import Poll from "./components/Poll";
import poll from "./stores/PollsInMemory";

React.render(<Poll poll={ poll } />, document.querySelector("#main"));
