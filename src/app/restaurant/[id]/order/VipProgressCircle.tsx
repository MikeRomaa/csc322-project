"use client";

import { ProgressCircle } from "@tremor/react";
import type React from "react";

interface VipProgressCardProps {
	progress: number;
}

export const VipProgressCircle: React.FC<VipProgressCardProps> = ({
	progress,
}) => (
	<ProgressCircle value={progress * 100} size="md" color="yellow">
		<span className="text-xs font-medium text-slate-700">
			{Math.floor(progress * 100)}%
		</span>
	</ProgressCircle>
);
