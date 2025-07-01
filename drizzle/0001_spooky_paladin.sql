CREATE TABLE `todo` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`created_by` text(255) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `todo_name_idx` ON `todo` (`name`);--> statement-breakpoint
CREATE INDEX `todo_order_idx` ON `todo` (`order`);--> statement-breakpoint
CREATE INDEX `todo_created_by_idx` ON `todo` (`created_by`);--> statement-breakpoint
DROP TABLE `post`;